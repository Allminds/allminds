App.TreeStructureDTO = function(rootNodeId, treeLayout){
    this.rootNodeId = rootNodeId;
    if(treeLayout === null){
        this.treeLayout = {root: {id: rootNodeId, children: []}};
    }else{
        this.treeLayout = treeLayout;
    }
//    this.children = [];
};

App.TreeNode = function(id, name, position, children){
    this.id = id;
    this.name = name;
    this.position = position;
    this.children = children;
    this.index = null;
};