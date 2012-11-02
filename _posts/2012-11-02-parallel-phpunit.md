---
layout: post
description: "Parallel testing in PHPUnit can be accomplished."
title: "Parallel PHPUnit - Running Tests Concurrently With ParaTest"
---

PHP is not really a language known for concurrency. It's threadless nature has lead it, and many of it's
tools to take a very top to bottom approach. It's always consecutive, and rarely concurrent. PHPUnit is no exception.

PHPUnit is still the big kid on the block when it comes to testing in PHP. One of it's biggest shortcomings is it's inability to 
test in parallel. This can be a huge bottleneck for long running tests. This often means tests in the functional
realm (i.e Selenium).

This is not a new problem, and some clever solutions have been put out there. <a href="https://github.com/brianium/paratest" target="__blank">ParaTest</a> is a tool built to address some of the shortcomings present in existing tools.

The Solution To The Problem
---------------------------
PHP does not support threads. However, PHP does allow us to open new processes.
This is what concurrent testing hinges on. We can run a testing tool like PHPUnit in several
processes. 

An example might look like this:

{% highlight php %}
<?php
/**
 * $runningTests - currently open processes
 * $loadedTests - an array of test paths
 */
while(sizeof($runningTests) || sizeof($loadedTests)) {
    while(sizeof($loadedTests) && sizeof($runningTests) < $maxProcs)
        $runningTests[] = proc_open("phpunit " . array_shift($loadedTests), $descriptorspec, $pipes);
    //remove any processes that have finished ....
}
?>
{% endhighlight %}

> proc_open is the work horse of concurrent testing with PHPUnit.

* * *

The Current Tools
-----------------
There aren't many solutions for testing in parallel with PHPUnit. You might find a <a href="https://github.com/testingbot/phpunit-parallel/blob/master/parallel.php" target="__blank">script</a> that runs suites (or entire files) in parallel. Other <a href="https://github.com/jlipps/paraunit" target="__blank">tools</a> excel at functional testing - that is running each test method in its own process.

These tools follow a process along the lines of:

1. Grep for test methods or load a directory of files containing test suites.
2. Open a process for each test method or suite.
3. Parse output from STDOUT pipe, or get output from a temporary log file.

This method can cover many cases, but it does have some significant shortfalls.

### Suites VS. Test Methods ###
If you only load entire files, you aren't very useful in a functional testing scenario 
where each test method has a potential to run for a while. Being able to run functional tests concurrently
is a huge gain, and often the fuel that drives the flame for concurrent testing.

If you only load test methods, then you
do a good job at functional testing, but you lose the ability to test scenarios where parallel suites
might be appropriate - maybe in a unit or integration test context.

It would be nice if both were supported.

### Pattern Matching Doesn't Quite Cut It ###
This problem affects the functional camp. The idea is to grab a bunch of files and search for their test methods.
This might look like grabbing all function names in a file by doing something like this:

{% highlight php %}
<?php
preg_match_all("/function (test[^\(]+)\(/", $file_str, $matches, PREG_PATTERN_ORDER);
?>
{% endhighlight %}

This approach can be speedy, but there are some significant drawbacks. For starters it removes the possibility
of testing methods that use annotations instead of the "test" prefix. The following would be skipped under the above
approach:

{% highlight php %}
<?php
/**
 * @test
 */
public function twoTodosCheckedShowsCorrectClearButtonText()
{
    $this->todos->addTodos(array('one', 'two'));
    $this->todos->getToggleAll()->click();
    $this->assertEquals('Clear 2 completed items', $this->todos->getClearButton()->text());
}
?>
{% endhighlight %}

Pattern matching the contents of a file also omits the possibility of utilizing inheritance. Consider the following scenario:

{% highlight php linenos %}
<?php
abstract class TodoTest extends PHPUnit_Extensions_Selenium2TestCase
{
    protected $browser = null;

    public function setUp()
    {
        //configure browser
    }

    public function testTypingIntoFieldAndHittingEnterAddsTodo()
    {
        //...
    }
}

class ChromeTodoTest extends TodoTest
{
    protected $browser = 'chrome';

    //experimental Chrome tests ...
}

class FirefoxTodoTest extends TodoTest
{
    protected $browser = 'firefox';

    //experimental Firefox tests ...
}
?>
{% endhighlight %}

The contents of a file alone don't give enough information.

> A good parallel testing tool for PHPUnit should support annotations and inheritance. Neither pattern matching test methods
> nor loading entire directories is flexible enough.

* * *

ParaTest To The Rescue
----------------------
ParaTest seeks to address the above problems. ParaTest introduces support for annotated tests, inheritance, and the
ability to test both suites and test methods in parallel. 

A big design goal of ParaTest was to follow a structured architecture so enhancements can easily be added (i.e support for @group), and changes are painless (like <a href="https://github.com/brianium/paratest/pull/6" target="__blank">changing the rules for loading a suite or file</a>).

ParaTest differs from the rest of the camp in that it uses Reflection to do its magic. This is how it is able to easily support annotations and inheritance.

For a refresher on the problems of parallel testing with PHPUnit, and an overview of how ParaTest stacks up against <a href="https://github.com/jlipps/paraunit" target="__blank">paraunit</a> check out these <a href="http://brianscaturro.com/presentations/paratest/" target="__blank">slides</a>.

> ParaTest allows you to run annotated test methods, inherited methods, and suites in parallel.

* * *

Installing And Using ParaTest
-----------------------------
ParaTest is available as a composer package. To include it in your project update your composer.json file:

{% highlight json %}
"require": {
    "brianium/paratest": "dev-master"
}
{% endhighlight %}

Then run `composer install`.

This will install the latest version of ParaTest and all of its dependencies (i.e PHPUnit). The binary can be found in `vendor/bin/paratest` or in the case of Windows `vendor\bin\paratest.bat`.

An example usage might be:
{% highlight bash %}
vendor/bin/paratest --path /path/to/tests --functional
{% endhighlight %}

Usage at the command line:

{% highlight bash %}
Usage: paratest [switches]

  --processes <number>     The number of phpunit processes to run.
  --path <file|directory>  The path to a directory or file containing tests.
  --phpunit <path>         The phpunit binary to execute.
  --bootstrap <file>       A bootstrap file to be used by phpunit.
  --functional             Run methods instead of suites in separate processes.
  -h|--help                Print usage information.
  --group ...              Only runs tests from the specified group(s).
{% endhighlight %}

For more information head over to the <a href="https://github.com/brianium/paratest" target="__blank">repo</a>. There is an example of using ParaTest with PHPUnit and Selenium Web Driver on <a href="https://github.com/brianium/paratest-selenium" target="__blank">Github</a> as well.

ParaTest VS. PHPUnit
--------------------
ParaTest was up to 2.25 times faster than PHPUnit when testing with Selenium Web Driver on my machine:

![PHPUnit running Selenium Web Driver Tests at 1:37](https://raw.github.com/brianium/paratest-selenium/master/phpunit-results.jpg)

![ParaTest running same tests at 0:43](https://raw.github.com/brianium/paratest-selenium/master/paratest-results.jpg)

> Parallel wins over serial any day.

* * *

The Future Of ParaTest
----------------------
One of the objectives of ParaTest is to be a parallel wrapper over multiple tools. Next on the radar is support for Behat. It would be awesome to see people forking <a href="https://github.com/brianium/paratest" target="__blank">ParaTest</a> and making it a valuable tool for parallel testing in PHP.