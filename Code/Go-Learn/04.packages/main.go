package main

import (
    "fmt"
    "calculator"
)

func main() {
    total := calculator.Sum(3, 15)
    fmt.Println(total)
    fmt.Println("Version: ", calculator.Version)

    // total := calculator.internalSum(5)
    // fmt.Println(total)
    // fmt.Println("Version: ", calculator.logMessage)
}