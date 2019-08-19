/**
* 快速排序  
* 解析：
*   1、在数据集之中，选择一个元素作为"基准"（pivot）。
*   2、所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
*   3、对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
* 理解重点：
*   直到所有子集只剩下一个y元素为止
* 对比：
*   快速排序适合用于大型数据集合，在处理小数据集合反而性能会下降。
*   快速排序是处理大数据集最快的排序算法之一，它是一种分而治之的算法，通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列
*/
export function quickSort(arr) {

    if (arr.length === 0) {
        return [];
    }

    let pivot = arr[0],
        left = [],
        right = [];

    for (var i = 1; i < arr.length; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

/**
* 冒泡排序  
* 解析：
*   1、比较相邻的两个元素，如果前一个比后一个大，则交换位置
*   2、第一轮的时候最后一个元素应该是最大的一个
*   3、按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较
* 缺点：效率最低的排序，但也是最容易实现的排序算法
*/
export function bubbleSort(arr) {
    let length = arr.length;

    for (let i = 0; i < length; i++) {
        for (let j = i; j < length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }

    return arr;
}