---
layout: post
description: "Continuing my algebra journey, I analyze some basics of the number system with Scala and ScalaTest."
title: "Dipping Into The Number System With Scala and ScalaTest"
---

My math quest continues as I open up the number system as part of my algebra adventure.

To re-cap, I am exploring these fundamental truths with 
[Scala](http://www.scala-lang.org/) and [ScalaTest](http://www.scalatest.org/).

You can checkout the [repo](https://github.com/brianium/scala-algebra) on Github.

Exploring The Number System With Scala
--------------------------------------
The real number system is made up of irrational numbers, rational numbers, fractions, and integers.

The main focus of this exploration with Scala is the set of rational numbers. This includes fractions and integers ( which in turn is composed of negative and positive integers as well as 0).

There will be a lot of talk about signs of quality (whether or not a number is postive or negative), and how to add, subtract, multiply and divide signed numbers.

* * *

Testing Addition With Signed Numbers
------------------------------------
For a review of setting up a test class, go [here](http://brianscaturro.com/2012/09/03/algebra-basics-with-scala.html#setting_up_the_tests).

Our first rule of addition:

> To add two numbers having opposite signs, find the difference of their absolute values and prefix the sign of the number having the larger absolute value

**Timeout for absolute values!**

An absolute value is a number's distance from 0, ignoring the sign. So the absolute value of -27 is 27, as it is 27 numbers away from 0. The absolute value of 27 is also 27, as it is 27 numbers away from 0.

Let's check this rule out in Scala:

{% highlight scala %}
test("adding two numbers of different sign") {
    val solution = (9) + (-5)

    val ruleApplied = +(abs(9) - abs(-5))

    assert(solution === ruleApplied)
    assert(solution === 4)
}
{% endhighlight %}
