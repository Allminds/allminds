App.TreeStructureDTO = function(rootNodeId, treeLayout){
    this.rootNodeId = rootNodeId;
    this.treeLayout = treeLayout;
};

App.TreeNode = function(id, children){
    this.id = id;
    this.children = children;
};