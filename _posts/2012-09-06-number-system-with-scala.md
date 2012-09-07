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

Easy weasy. As you can see, `abs` is used to get the absolute value of a number. What about adding numbers of the same sign?

Our second rule of addition:

> To add two signed numbers that have like signs, add their absolute values and prefix their common sign.

And in Scala:

{% highlight scala %}
test("adding two numbers of same sign") {
    val solution = (-4) + (-13)

    val ruleApplied = -(abs(4) + abs(13))

    assert(solution === ruleApplied)
    assert(solution === -17)
}
{% endhighlight %}

The proof is in the passing test!

* * *

Testing Subtraction With Signed Numbers
---------------------------------------
This rule is super simple.

> To subtract a number, add its opposite

Let's see it in action:

{% highlight scala %}
test("(+4) - (-2)") {
    val solution = (4) - (-2)

    val ruleApplied = (4) + (2)

    assert(solution === ruleApplied)
    assert(solution === 6)
}
{% endhighlight %}

We can combine signed integers when applying this rule to problems with multiple values:

{% highlight scala %}
test("(-7) - (-9) - (+4)") {
    val solution = (-7) - (-9) - (+4)

    val ruleApplied = (-7) + (+9) + (-4)

    val grouped = (-11) + (+9)

    val addRuleApplied = -(abs(-11) - abs(9))

    assert(solution === ruleApplied)
    assert(solution === grouped)
    assert(solution === addRuleApplied)
    assert(solution === -2)
}
{% endhighlight %}

* * *

Testing Multplication With Signed Numbers
-----------------------------------------

Multiplication rule one:

> When multiplying two signed numbers, if the signs are the same, the product will be positive

{% highlight scala %}
test("multiplication of two numbers of same sign is positive") {
    val x = -9; val y = -8
    val solution = x * y

    assert(solution > 0)
    assert(solution === 72)
}
{% endhighlight %}

And rule two:

> When multiplying two signed numbers, if the signs of the numbers are different, the product will be negative

{% highlight scala %}
test("multiplication of two numbers of different sign is negative") {
    val x = 3; val y = -7
    val solution = x * y

    assert(solution < 0)
    assert(solution === -21)
}
{% endhighlight %}

And the third rule:

> Regardless of the number of factors, the product of more than two numbers is always negative if there are an odd number of negative factors, and positive if there are an even number of negative factors.

{% highlight scala %}
test("multiplication of three factors with two negative factors is positve") {
    val solution = (-3) * (+3) * (-4)

    assert(solution > 0)
    assert(solution === 36)
}
{% endhighlight %}

And with an odd number of negative factors:

{% highlight scala %}
test("multiplication of four factors with three negative factors is negative") {
    val solution = (-5) * (-7) * (-1) * (4)

    assert(solution < 0)
    assert(solution === -140)
}
{% endhighlight %}

These same rules apply to exponents and division as well. You can see more examples of this on [Github](https://github.com/brianium/scala-algebra/blob/master/src/test/scala/com/brianscaturro/NumberSystemSuite.scala).

* * *

Evaluating Expressions With Signed Numbers
------------------------------------------
All the rules so far apply to expressions where substitution is necessary. It helps to replace the variables in an expression with the supplied variables in parentheses.

{% highlight scala %}
test("abc ^ 2 for a = 1, b = 2, c = -3") {
    val a = 1; val b = 2; val c = -3
    val solution = a * b * pow(c, 2)

    val replaced = (1) * (2) * pow(c, 2)

    assert(solution === replaced)
    assert(solution === 18)
 }
{% endhighlight %}

* * *

There are some tests left out here, but you can view the whole test suite on Github.

<a href="https://github.com/brianium/scala-algebra/blob/master/src/test/scala/com/brianscaturro/NumberSystemSuite.scala" target="_blank" class="button">The Source</a>
