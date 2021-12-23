package main

import (
	"fmt"
	// "math/rand"
	"time"
)

func location(city string) (string, string) {
	region := ""
	continent := ""
	switch city {
		case "Delhi", "Hyderabad", "Mumbai", "Chennai", "Kochi":
				region, continent = "India", "Asia"
		case "Lafayette", "Louisville", "Boulder":
				region, continent = "Colorado", "USA"
		case "Irvine", "Los Angeles", "San Diego":
				region, continent = "California", "USA"
		default:
				region, continent = "Unknown", "Unknown"
	}
	return region, continent
}

func timeFunc(){
	fmt.Println(time.Now().Weekday().String(), "Weekday")
	switch time.Now().Weekday().String() {
		case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
				fmt.Println("It's time to learn some Go.")
		default:
				fmt.Println("It's weekend, time to rest!")
	}

	fmt.Println(time.Now().Weekday().String())
}

func fallthroughDemo(){
	switch num := 15; {
	case num < 50:
			fmt.Printf("%d is less than 50\n", num)
			fallthrough
	case num > 100:
			fmt.Printf("%d is greater than 100\n", num)
			fallthrough
	case num < 200:
			fmt.Printf("%d is less than 200", num)
	}
}

func main() {
	// sec := time.Now().Unix()
	// fmt.Println(sec, "~~~")
	// rand.Seed(sec)
	// i := rand.Int31n(10)

	// switch i {
	// 	case 0:
	// 			fmt.Print("zero...")
	// 	case 1:
	// 			fmt.Print("one...")
	// 	case 2:
	// 			fmt.Print("two...")
	// }

	// region, continent := location("Irvine")
	// fmt.Printf("John works in %s, %s\n", region, continent)

	// timeFunc();

	fallthroughDemo();
}