---
layout: post
description: "I've decided to review some Algebra, and I thought it would be fun to do so with Scala and ScalaTest."
title: "Algebra Basics With Scala and ScalaTest"
---

I am on a quest. A quest to train my math powers. I am surprised by how much a programmer can get away with without using math (at least directly).

Programmers are problem solvers, and nothing benefits acuity of mind like math does. I ran the calc and stats gauntlet not too long ago at college, but I know I could stand to stay sharp, and gaining some mastery along the way wouldn't hurt.

Scala As My Excalibur
---------------------
[Scala](http://www.scala-lang.org/) is a pretty boss language on the JVM, and [ScalaTest](http://www.scalatest.org/) is a pretty boss testing tool for Scala.

To keep things a bit more exciting as I revisit the basics, I thought it might be fun to run these tests via ScalaTest. I'll be updating this [repo](https://github.com/brianium/scala-algebra) on Github as I progress.

* * *

Setting Up The Tests
--------------------
This project follows a conventional structure for Scala projects and uses [sbt](https://github.com/harrah/xsbt/wiki/) to manage the build process. Just about everything can be found in the src/test/scala/com/brianscaturro directory

### The test class ###

ScalaTest supports different styles of testing. I chose the more traditional style supported by the `FunSuite` trait:

{% highlight scala %}
import org.scalatest._
import scala.math._

class BasicsSuite extends FunSuite {

}
{% endhighlight %}

As you can see, this first test is intended to cover algebra basics. It only requires that we import the ScalaTest library, and the scala.math package.

* * *

Testing Division By Zero
------------------------
Any student of math will tell you that dividing by zero is pure insanity. It is unpossible and imthinkable. Java uses an `ArithmeticException` when this black art is attempted. Scala uses that same exception:

{% highlight scala %}
test("division by zero is impossible") {
   val x = 3
   intercept[ArithmeticException] {
       7 / (x - 3)        
   }
}
{% endhighlight %}

ScalaTest provides that nice little intercept method to test for an exception of a given type. Here we test a scenario where an evaluated expression would result in division by zero.

* * *

Testing Simplification Of Problems
----------------------------------
A routine algebra drill is the grouping of like terms. I ran these tests by calculating the "long" version and the "short" version. I then asserted that they were equal.

{% highlight scala %}
test("ax ^ 2 + by + b ^ 2 + 3ax ^ 2") {
    val a = 4; val x = 7; val b = 3; val y = 5

    val solution = a * pow(x, 2) + b * y + pow(b, 2) + 3 * a * pow(x, 2)

    val grouped = 4 * a * pow(x, 2) + b * y + pow(b, 2)

    //4ax ^ 2 + by + b ^ 2
    assert(solution === grouped)
}
{% endhighlight %}

This test gave me an excuse to showcase scala.math's `pow` function, as well as practice this classic algebra tactic.

* * *

Running The Tests
-----------------
sbt is pretty wizard, and it makes running tests a snap. All the dependencies are resolved as part of the build process, so running the tests is as easy as changing your working directory to the project directory and running the following (provided you have sbt installed):

{% highlight bash %}
$ sbt test
{% endhighlight %}

This will make sure any dependencies are installed, the code is compiled, and that the tests are run.

* * *

I omitted some tests here, but you can check out the full source for the basics on Github.

<a href="https://github.com/brianium/scala-algebra/blob/master/src/test/scala/com/brianscaturro/BasicsSuite.scala" class="button" target="_blank">The Source</a>