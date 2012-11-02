package com.brianscaturro

import scala.math._

package object math {    

    class BriansDouble(doub: Double) {
        def ^(exp: Double): Double = {
            pow(doub, exp)
        }
    }
    implicit def enrichDouble(d: Double) = new BriansDouble(d)
}