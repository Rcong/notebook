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
    1.比较相邻的元素。如果第一个比第二个大，就交换他们两个。
    2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
    3.针对所有的元素重复以上的步骤，除了最后一个。
* 缺点：效率最低的排序，但也是最容易实现的排序算法
*/
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                [ arr[j], arr[j+1] ] = [ arr[j+1], arr[j] ]
            }
        }
    }
    return arr;
}