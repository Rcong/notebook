package main
import "fmt"
import "strconv"

func main() {
   var integer32 int = 2147483648
	 fullName := "John Doe \n(alias \"Foo\")\n"
   fmt.Println(fullName, integer32)

	//  var integer uint = -10
  //  fmt.Println(integer)

	 i, _ := strconv.Atoi("-42")
	 s := strconv.Itoa(-42)
	 fmt.Println(i, s)

}