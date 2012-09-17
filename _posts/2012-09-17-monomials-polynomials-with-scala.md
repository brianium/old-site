---
layout: post
description: "In step with my ongoing math adventure, I look at the fundamental concept of monomials and polynomials using Scala and ScalaTest"
title: "Monomials and Polynomials With Scala and ScalaTest"
---

Onward and upward in the algebra-verse. It is time for me to review the application of monomials and polynomials using Scala and ScalaTest.

You can checkout the [repo](https://github.com/brianium/scala-algebra) on Github.

Monomials and Polynomials
-------------------------
It might be helpful to begin with some definitions. A monomial can be defined as the following:

> A monomial is an algebraic expression consisting of one term

This would be something like `ak` or `kmn/2`

A polynomial can be defined like so:

> A polynomial is an algebraic expression consisting of several terms

We can demonstrate this with something like the following: `ak + kmn/2 - x ^ 2`

Likewise there are binomials for two-term expressions, and trinomials for three-term expressions.

* * *

Adding Polynomials
------------------
Polynomials can be added  by following a couple steps. These steps usually involve removing parentheses, grouping like terms, and simplifying. We can assert this process in ScalaTest like so:

{% highlight scala %}
test("Add two polynomials: (4x^2 - 3 + 2x) + (5x - 2x^2)") {
    val x = 3

    //drop parentheses
    val solution = 4 * pow(x, 2) - 3 + 2 * x + 5 * x - 2 * pow(x, 2)

    //group like terms
    val grouped = (4 - 2) * pow(x, 2) + (5 + 2) * x - 3

    //simplify
    val simplified = 2 * pow(x, 2) + 7 * x - 3


    assert(solution === grouped)
    assert(solution === simplified)
}
{% endhighlight %}

After simplifying we have the much leaner expression 2x<sup>2</sup> + 7x - 3

* * *

Subtracting Polynomials
-----------------------
Subtracting polynomials follow similar rules to addition, with one caveat. The subtrahend - that is the expression being subtracted - must be taken as it's additive inverse. That means (6a - b + 2) - (2a + 3b - 4) becomes 6a - b + 2 - 2a - 3b + 4. Notice everything in the subtrahend becomes it's opposite.

{% highlight scala %}
test("(6a - b + 2) - (2a + 3b - 4)") {
    val a = 2; val b = 3

    //drop parentheses and use additive inverse of subtrahend
    val solution = 6 * a - b + 2 - 2 * a - 3 * b + 4

    //group like terms
    val grouped = (6 - 2) * a - (3 + 1) * b + 6

    //simplify
    val simplified = 4 * a - 4 * b + 6

    assert(solution === grouped)
    assert(grouped === simplified)
}
{% endhighlight %}

* * *

Multiplying Polynomials And Monomials
-------------------------------------
There are a couple of different rules to consider when doing multiplication of monomials and polynomials. We will look at several of these.

### Monomials with exponents ###
It is pretty easy to multiply monomials with exponents when they have a common base. If you have x<sup>3</sup> * x<sup>4</sup> you have (x * x * x) * (x * x * x * x) or xxxxxxx or x<sup>7</sup>. Hence x<sup>y</sup> * x<sup>z</sup> = x<sup>y + z</sup>

{% highlight scala %}
test("a^3 * a^6") {
    val a = 7

    val solution = pow(a, 3) * pow(a, 6)

    val simplified = pow(a, 9)

    assert(solution === simplified)
}
{% endhighlight %}

### Raising exponents to a given power ###
What about when we need to raise a base that already contains an exponent. This is the situation with something like (x<sup>3</sup>)<sup>3</sup>. This can be read as x<sup>3</sup> * x<sup>3</sup> * x<sup>3</sup> or xxxxxxxxx or x<sup>9</sup>. This gives us (x<sup>y</sup>)<sup>z</sup> = x<sup>y * z</sup>.

{% highlight scala %}
test("(x^3)^3") {
    val x = 5

    val solution = pow(pow(x, 3), 3)

    //to find the power of a power of a base, keep the base and multiply the exponents
    val simplified = pow(x, 3 * 3)

    assert(solution === simplified)
}
{% endhighlight %}

### Multiplying polynomials by monomials ###
To multiply a polynomial by a monomial, we just need to distribute the monomial throughout the polynomial. We can demonstrate this in ScalaTest like so:

{% highlight scala %}
test("(b/3)(9b - 6 + 12a)") {
    val a = 2; val b = 4f

    val solution = (b/3) * (9 * b - 6 + 12 * a)

    //distribute numerator
    val distributed = (9 * pow(b, 2) - 6 * b + 12 * a * b) / 3

    //divide numerical factors by denominator
    val divided = 3 * pow(b, 2) - 2 * b + 4 * a * b

    assert(solution === distributed)
    assert(solution === divided)
}
{% endhighlight %}

Keep an eye on the value for b. It has been converted to a floating point number, because if we had not done this, then 4/3 would have resulted in 1 for our `solution` value. This would drastically alter the results of our calculation.

### Multiplying multiple polynomials ###
When multiplying two polynomials, it can be helpful to stack them vertically. Consider the following:

-2x<sup>2</sup> + y<sup>2</sup> + xy  
* x - y

The key is to move left to right, first multiplying each term on top against the term on the bottom left. Then do the same for the term on the bottom right. Then just group like terms and simplify.

{% highlight scala %}
test("(-2x^2 + y^2 + xy) * (x - y)") {
    val x = 8; val y = 7

    val solution = (-2 * pow(x, 2) + pow(y, 2) + x * y) * (x - y)

    //multiply each term on the left by x first then multiply each term on the left by -y
    val multiplied = -2 * pow(x, 3) + pow(y, 2) * x + pow(x, 2) * y + 2 * pow(x, 2) * y - pow(y, 3) - x * pow(y, 2)

    //group like terms
    val grouped = -2 * pow(x, 3) - pow(y, 3) + 3 * pow(x, 2) * y

    assert(solution === multiplied)
    assert(solution === grouped)
}
{% endhighlight %}

* * *

Dividing Polynomials and Monomials
----------------------------------
It should be no surprise that division follows similar rules to multiplication.

### Monomials with exponents ###
Like multiplication, dividing monomials containing exponents is simple if they have a common base. Given a<sup>8</sup> / a<sup>5</sup>, we have aaaaaaaa / aaaaa. You will get a 1 for every value in the denominator if the numerator's exponent is greater. This effectively cancels all the bases in the denominator, leaving us with what is left in the numerator: aaa. Therefore, a<sup>x</sup> / a<sup>y</sup> = a<sup>x - y</sup>, where x is greater than y.

{% highlight scala %}
test("a^8 / a^5") {
    val a = 3

    val solution = pow(a, 8) / pow(a, 5)

    //if exponent in numerator is greater than exponent in denominator then a^x / a^y = a^(x - y)
    val simplified = pow(a, 8 - 5)

    assert(solution === simplified)
}
{% endhighlight %}

We follow a slightly different rule if the exponent in the denominator is larger. a<sup>x</sup> / a<sup>y</sup> = 1/a<sup>y -x</sup> where y is greater than x.

### Dividing polynomials by monomials ###
This knowledge of dividing exponents comes in handy when dividing polynomials by monomials. Hopefully this example in Scala demonstrates why:

{% highlight scala %}
test("11m^3k^2 + 33mk^3 - 22mk / 11mk") {
    val m = 2; val k = 3

    val solution = (11 * pow(m, 3) * pow(k, 2) + 33 * m * pow(k, 3) - 22 * m * k) / (11 * m * k)

    //divide numerical factors and apply rule for dividing exponents
    val divided = pow(m, 3 - 1) * pow(k, 2 - 1) + 3 * pow(m, 1 - 1) * pow(k, 3 - 1) - 2 * pow(m, 1 - 1) * pow(k, 1 - 1)

    val simplified = pow(m, 2) * pow(k, 1) + 3 * pow(k, 2) - 2

    assert(solution === divided)
    assert(solution === simplified)
}
{% endhighlight %}

* * *

As usual, I have left out some tests. Be sure to checkout the whole test suite on Github

<a href="https://github.com/brianium/scala-algebra/blob/master/src/test/scala/com/brianscaturro/MonomialsAndPolynomialsSuite.scala" target="_blank" class="button">The Source</a>