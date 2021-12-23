package main

import (
    "os"
    "strconv"
		"fmt"
)

func sum(number1, number2 string) int {
	int1, _ := strconv.Atoi(number1)
	int2, _ := strconv.Atoi(number2)
	return int1 + int2
}

func calc(number1 string, number2 string) (sum int, mul int) {
	int1, _ := strconv.Atoi(number1)
	int2, _ := strconv.Atoi(number2)
	sum = int1 + int2
	mul = int1 * int2
	return
}

func main() {
		// sum := sum(os.Args[1], os.Args[2])
		// fmt.Println("Sum:", sum)

		sum, mul := calc(os.Args[1], os.Args[2])
    fmt.Println("Sum:", sum)
    fmt.Println("Mul:", mul)
}