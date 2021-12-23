package main

import (
	"fmt"
)

type TreeNode struct {
	Value int
	Left *TreeNode
	Right *TreeNode
}

func invertTree(root *TreeNode) *TreeNode{
 if root == nil {
	 return nil
 }

 temp := invertTree(root.Left);
 root.Left = invertTree(root.Right)
 root.Right = temp;
 return root;
}

func main(){
	root := &TreeNode{
		Value: 4,
		Left: &TreeNode{
			Value: 2,
			Left: &TreeNode{
				Value: 1,
			},
			Right: &TreeNode{
				Value: 3,
			},
		},
		Right: &TreeNode{
			Value: 7,
			Left: &TreeNode{
				Value: 6,
			},
			Right: &TreeNode{
				Value: 9,
			},
		},
	}

	fmt.Println("root", root)
	result := invertTree(root)
	fmt.Println("result", result)
}