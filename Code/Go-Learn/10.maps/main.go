package main

import "fmt"

func demo1(){
	studentsAge := map[string]int{
			"john": 32,
			"bob":  31,
	}
	fmt.Println(studentsAge)
}

func demo2(){
	studentsAge := make(map[string]int)
	studentsAge["john"] = 32
	studentsAge["bob"] = 31
	fmt.Println(studentsAge)
}

func demo3(){
	studentsAge := make(map[string]int)
	studentsAge["john"] = 32
	studentsAge["bob"] = 31

	age, exist := studentsAge["christy"]
	fmt.Println(age, exist)
	if exist {
			fmt.Println("Christy's age is", age)
	} else {
			fmt.Println("Christy's age couldn't be found")
	}
}

func demo5A(){
	studentsAge := make(map[string]int)
	studentsAge["john"] = 32
	studentsAge["bob"] = 31
	for name, age := range studentsAge {
			fmt.Printf("%s\t%d\n", name, age)
	}
}

func main() {
	// demo1()
	// demo2()
	// demo3()
	demo5A()
}