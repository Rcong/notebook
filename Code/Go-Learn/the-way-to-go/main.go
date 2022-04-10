package main

import (
	"fmt"
	"time"

	chapter_14 "github.com/Rcong/the-way-to-go/exercise/chapter_14"
)

func main() {
	// examples.Goroutine2()
	// examples.ChannelBlock()
	// examples.ChannelExample_00()
	chapter_14.Channel_block3()
	chapter_14.Channel_idiom()

	// 2个管道
	output1 := make(chan string)
	output2 := make(chan string)
	// 跑2个子协程，写数据
	go test1(output1)
	go test2(output2)
	// 用select监控
	select {
	case s1 := <-output1:
		fmt.Println("s1=", s1)
	case s2 := <-output2:
		fmt.Println("s2=", s2)
	}

}

func test1(ch chan string) {
	time.Sleep(time.Second * 5)
	ch <- "test1"
}
func test2(ch chan string) {
	time.Sleep(time.Second * 2)
	ch <- "test2"
}
