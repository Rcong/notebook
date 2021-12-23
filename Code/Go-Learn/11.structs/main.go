package main

import (
	"fmt"
	"encoding/json"
)

func demo1(){
	type Employee struct {
		ID        int
		FirstName string
		LastName  string
		Address   string
	}

	employee := Employee{LastName: "Doe", FirstName: "John"}
	fmt.Println("before employee", employee)
	employeeCopy := &employee
	employeeCopy.FirstName = "David"
	fmt.Println("after employee", employee)
	fmt.Println("employeeCopy", employeeCopy)
}

func demo2(){
	type Person struct {
		ID        int
		FirstName string
		LastName  string
		Address   string
	}

	type Employee struct {
		Person
		ManagerID int
	}

	type Contractor struct {
		Person
		CompanyID int
	}

	employee := Employee{
		Person: Person{
				FirstName: "John",
		},
	}
	employee.LastName = "Doe"
	fmt.Println(employee)
}

func demo3(){
	type Person struct {
		ID        int
		FirstName string `json:"name"`
		LastName  string
		Address   string `json:"address,omitempty"`
	}

	type Employee struct {
		Person
		ManagerID int
	}

	type Contractor struct {
		Person
		CompanyID int
	}

	employees := []Employee{
		Employee{
			Person: Person{
				LastName: "Doe", FirstName: "John",
			},
		},
		Employee{
			Person: Person{
				LastName: "Campbell", FirstName: "David",
			},
		},
	}

	data, _ := json.Marshal(employees)
	fmt.Printf("%s\n", data)

	var decoded []Employee
	json.Unmarshal(data, &decoded)
	fmt.Printf("%v", decoded)
}

func main() {
	// demo1()
	// demo2()
	demo3()
}