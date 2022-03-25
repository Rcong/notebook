package examples

import "fmt"

func ChannelExample_00() {
	// 这里我们定义了一个可以存储整数类型的带缓冲通道
	// 缓冲区大小为2
	cacheCount := 10
	ch := make(chan int, cacheCount)

	// 因为 ch 是带缓冲的通道，我们可以同时发送两个数据
	// 而不用立刻需要去同步读取数据
	for i := 0; i < cacheCount; i++ {
		ch <- i
	}

	// 获取数据
	for i := 0; i < cacheCount; i++ {
		fmt.Println(<-ch)
	}
}
