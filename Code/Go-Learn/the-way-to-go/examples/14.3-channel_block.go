package examples

import "fmt"

func ChannelBlock() {
	ch1 := make(chan int)
	go pump(ch1) // pump hangs
	i := <-ch1
	fmt.Println(i) // prints only 0
}

func pump(ch chan int) {
	for i := 0; ; i++ {
		ch <- i
	}
}
