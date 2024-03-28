window.addEventListener('DOMContentLoaded', async () => {
    let treedata = null;
    await fetch('./data.json')
        .then(res => res.json())
        .then(data => {
            treedata = data;
        })
    /* 遍历treedata，生成HTML代码,赋值给tree-wapper */
    let treeHTML = '';
    treedata.forEach(item => {
        treeHTML += `
        <div class="tree-node">
        <div class="tree-node-name unify">${item.meetname}</div>
        <div class="tree-line"></div>
        <div class="tree-node-children-wapper">
        ${item.children.map(item => {
            return `
                <div class="tree-node-children">
                <div class="tree-node-child-name unify">${item.childname}</div>
                <div class="tree-line2"></div>
                <div class="tree-node-child-childrenoperate">
                ${item.childoperate.map(item => {
                return `<div class="tree-node-child-operate unify">${item}</div>`
            }).join('')
                }
                </div>
            </div>`
        }).join('')
            }
        </div>
    </div>
    `
    })
    /* 将treeHTML赋值给tree-wapper */
    document.getElementsByClassName('tree-wapper')[0].innerHTML = treeHTML;
    /* 获取childrens高度 */
    let childrensh = document.getElementsByClassName('tree-node-children-wapper')[0].getBoundingClientRect().height;
    console.log(childrensh, 999)
    /* 获取第一个子盒子和最后一个子盒子 */
    let firstChild = document.getElementsByClassName('tree-node-children-wapper')[0].firstElementChild.getBoundingClientRect().height / 2;
    let lastChild = document.getElementsByClassName('tree-node-children-wapper')[0].lastElementChild.getBoundingClientRect().height / 2;
    /* 计算树线高度 */
    let treeLineH = childrensh - firstChild - lastChild;
    /* 为tree-wapper设置自定义变量 */
    document.getElementsByClassName('tree-wapper')[0].style.setProperty('--tree-line-h', treeLineH + 'px');
    /* 获取tree-node-child-childrenoperate的高*/
    let treeNodeChildChildrenoperateH = document.getElementsByClassName('tree-node-child-childrenoperate')[0].getBoundingClientRect().height;
    /* 获取第一个子盒子和最后一个子盒子 */
    let firstChild2 = document.getElementsByClassName('tree-node-child-childrenoperate')[0].firstElementChild.getBoundingClientRect().height / 2;
    let lastChild2 = document.getElementsByClassName('tree-node-child-childrenoperate')[0].lastElementChild.getBoundingClientRect().height / 2;
    /* 计算树线高度 */
    let treeLineH2 = treeNodeChildChildrenoperateH - firstChild2 - lastChild2;
    /* 为tree-wapper设置自定义变量 */
    document.getElementsByClassName('tree-wapper')[0].style.setProperty('--tree-line-h2', treeLineH2 + 'px');

});