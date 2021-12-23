package main

import (
	"io"
	"os"
	"fmt"
)

func demo1(){
	for i := 1; i <= 4; i++ {
			defer fmt.Println("deferred", -i)
			fmt.Println("regular", i)
	}
}

func demo2() {
	newfile, error := os.Create("learnGo.txt")
	if error != nil {
			fmt.Println("Error: Could not create file.")
			return
	}
	defer newfile.Close()

	if _, error = io.WriteString(newfile, "Learning Go~~~~~"); error != nil {
			fmt.Println("Error: Could not write to file.")
			return
	}

	newfile.Sync()
}

func highlow(high int, low int) {
	if high < low {
			fmt.Println("Panic!")
			panic("highlow() low greater than high~~")
	}
	defer fmt.Println("Deferred: highlow(", high, ",", low, ")")
	fmt.Println("Call: highlow(", high, ",", low, ")")

	highlow(high, low + 1)
}

func main() {
	// demo1();
	// demo2();

  defer func() {
		handler := recover()
		if handler != nil {
				fmt.Println("main(): recover", handler)
		}
	}()

	highlow(2, 0)
	fmt.Println("Program finished successfully!")
}