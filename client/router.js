document.documentElement.lang = 'es'
accountsUIBootstrap3.setLanguage('es');

Router.configure({
  layoutTemplate: 'appLayout'
})

Router.onBeforeAction(function () {    
  if  (!Meteor.userId() && !Meteor.loggingIn()) {
    this.redirect('home');
    this.stop();
  } else {
    this.next();
  }
}, {except: [
  'home',
  'seeds.index', 
  'seeds.families.index',
  'seeds.families.one',
  'seeds.one',
  'seeds.calendar',
  'trees.index',
  'trees.one',
  'trees.families.index',
  'trees.families.one',
  'herbs.index',
  'herbs.one',
  'myorchards.index',
  'blog.index',
  'blog.one',
] });

Router.route('/', function () {
  this.render('home')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('wordpress','http://tiempodesiembra.es/api?json=get_posts&count=3')
    ]
  },
  name: 'home',
  title: 'Inicio'
})

Router.route('/blog', function () {
  this.render('blog')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('wordpress','http://tiempodesiembra.es/api?json=get_posts&count=10')
    ]
  },
  name: 'blog.index',
  parent: 'home',
  title: 'Blog'
})

Router.route('/blog/:_slug', function () {
  this.render('blogOne')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('wordpress','http://tiempodesiembra.es/api?json=get_posts&count=10')
    ]
  },
  name: 'blog.one',
  parent: 'blog.index',
  title: 'Blog'
})

Router.route('/seeds/families', function () {
  this.render('seedFamilies')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedFamilies'),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seedsFamilies: SeedFamilies.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'seeds.families.index',
  parent: 'seeds.index',
  title: 'Familias'
})

Router.route('/seeds/families/add', function () {
  this.render('seedFamiliesAdd')
}, {
  subscriptions: function() {
    return [
    ]
  },
  data: function() {
    if (this.ready) {
      return {
      }
    }
  },
  name: 'seeds.families.add',
  parent: 'seeds.families.index',
  title: 'Nueva'
})

Router.route('/seeds/families/:_id/edit', function () {
  this.render('seedFamiliesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedFamilies', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seedsFamily: SeedFamilies.findOne({_id: this.params._id})
      }
    }
  },
  name: 'seeds.families.edit',
  title: 'Editar'
})

Router.route('/seeds/families/:_id', function () {
  this.render('seedFamiliesView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedFamilies', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seedsFamily: SeedFamilies.findOne({_id: this.params._id})
      }
    }
  },
  name: 'seeds.families.one',
  parent: 'seeds.families.index',
  title: () => seedsFamily.name
})

Router.route('/seeds', function () {
  this.render('seeds')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Seeds')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seeds: Seeds.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'seeds.index',
  parent: 'home',
  title: 'Semillas'
})



Router.route('/seeds/calendar', function () {
  this.render('seedTimeCalendar')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedsTiming')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seeds: Seeds.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'seeds.calendar',
  parent: 'seeds.index',
  title: 'Calendario'
})

Router.route('/seeds/add', function () {
  this.render('seedsAdd')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedFamilies'),
      Meteor.subscribe('SeedsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seedFamilies: SeedFamilies.find({}),
        seedNames: Seeds.find({}, {fields: {name:1}, sort: { name: -1 }})
      }
    }
  },
  name: 'seeds.add',
  title: 'Añadir',
  parent: 'seeds.index'
})

Router.route('/seeds/:_id', function () {
  this.render('seedsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedFamilies'),
      Meteor.subscribe('Seeds', this.params._id),
      Meteor.subscribe('SeedsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seed: Seeds.findOne({_id: this.params._id})
      }
    }
  },
  name: 'seeds.one',
  title: function() { return this.data().seed ? this.data().seed.variant : '' },
  parent: 'seeds.index'
})

Router.route('/seeds/:_id/edit', function () {
  this.render('seedsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Seeds', this.params._id),
      Meteor.subscribe('SeedFamilies'),
      Meteor.subscribe('SeedsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seed: Seeds.findOne({_id: this.params._id})
      }
    }
  },
  name: 'seeds.one.edit',
  title: 'Editar',
  parent: 'seeds.one'
})


Router.route('/trees', function () {
  this.render('trees')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Trees'),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        trees: Trees.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'trees.index',
  parent: 'home',
  title: 'Árboles'
})










Router.route('/trees/families', function () {
  this.render('treeFamilies')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('TreeFamilies'),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        treesFamilies: TreeFamilies.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'trees.families.index',
  parent: 'trees.index',
  title: 'Familias'
})

Router.route('/trees/families/add', function () {
  this.render('treeFamiliesAdd')
}, {
  subscriptions: function() {
    return [
    ]
  },
  data: function() {
    if (this.ready) {
      return {
      }
    }
  },
  name: 'trees.families.add',
  parent: 'trees.families.index',
  title: 'Nueva'
})

Router.route('/trees/families/:_id', function () {
  this.render('treeFamiliesView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('TreeFamilies', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        treesFamily: TreeFamilies.findOne({_id: this.params._id})
      }
    }
  },
  name: 'trees.families.one',
  parent: 'trees.families.index',
  title: function() { return this.data().treesFamily ? this.data().treesFamily.name : null; }
})

Router.route('/trees/families/:_id/edit', function () {
  this.render('treeFamiliesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('TreeFamilies', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        treesFamily: TreeFamilies.findOne({_id: this.params._id})
      }
    }
  },
  name: 'trees.families.edit',
  parent: 'trees.families.one',
  title: 'Editar'
})

















// ****************************************************************************
// HERBS
// ****************************************************************************

Router.route('/herbs', function () {
  this.render('herbs')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Herbs')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        herbs: Herbs.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'herbs.index',
  parent: 'home',
  title: 'Hierbas'
})


Router.route('/herbs/add', function () {
  this.render('herbsAdd')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('SeedsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        seedNames: Seeds.find({}, {fields: {name:1}, sort: { name: -1 }})
      }
    }
  },
  name: 'herbs.add',
  title: 'Añadir',
  parent: 'herbs.index'
})

Router.route('/herbs/:_id', function () {
  this.render('herbsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Herbs', this.params._id),
      Meteor.subscribe('SeedsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        herb: Herbs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'herbs.one',
  title: function() { return this.data().herb ? this.data().herb.name : '' },
  parent: 'herbs.index'
})

Router.route('/herbs/:_id/edit', function () {
  this.render('herbsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Herbs', this.params._id),
      Meteor.subscribe('SeedsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        herb: Herbs.findOne({_id: this.params._id})
      }
    }
  },
  name: 'herbs.one.edit',
  title: 'Editar',
  parent: 'herbs.one'
})

// ****************************************************************************
// TREES
// ****************************************************************************

Router.route('/trees/add', function () {
  this.render('treesAdd')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('TreeFamilies')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
      }
    }
  },
  name: 'trees.add',
  parent: 'trees.index',
  title: 'Añadir'
})

Router.route('/trees/:_id', function () {
  this.render('treesOne')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Trees', this.params._id),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        tree: Trees.findOne({_id: this.params._id})
      }
    }
  },
  name: 'trees.one',
  parent: 'trees.index',
  title: function() { return this.data().tree ? this.data().tree.variant : null; }
})

Router.route('/trees/:_id/edit', function () {
  this.render('treesOneEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Trees', this.params._id),
      Meteor.subscribe('TreeFamilies')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        tree: Trees.findOne({_id: this.params._id})
      }
    }
  },
  name: 'trees.one.edit',
  parent: 'trees.one',
  title: 'Editar'
})

Router.route('/myorchards', function () {
  this.render('myOrchards')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards'),
      Meteor.subscribe('MyBenchs'),
      Meteor.subscribe('MyTrees')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchards: MyOrchards.find({}, {sort: {name: 1}}),
          myTrees:  MyTrees.find(),
         myBenchs:  MyBenchs.find()
      }
    }
  },
  name: 'myorchards.index',
  parent: 'home',
  title: 'Mis huertos'
})

Router.route('/myorchards/new', function () {
  this.render('myOrchardsNew')
}, {
  subscriptions: function() {
    return [
    ]
  },
  data: function() {
    if (this.ready) {
      return {
      }
    }
  },
  name: 'myorchards.new',
  parent: 'myorchards.index',
  title: 'Nuevo'
})

Router.route('/myorchards/:_id', function () {
  this.render('myOrchardsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params._id),
      Meteor.subscribe('MyTrees', this.params._id),
      Meteor.subscribe('MyBenchs', this.params._id),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchards: MyOrchards.findOne({}),
        myOrchard:  MyOrchards.findOne({_id:this.params._id}),
          myTrees:  MyTrees.find({orchardId:this.params._id}, {sort: {name: 1}}),
         myBenchs:  MyBenchs.find({orchardId:this.params._id}, {sort: {name: 1}})
      }
    }
  },
  name: 'myorchards.one',
  parent: 'myorchards.index',
  title: function() { return this.data().myOrchard ? this.data().myOrchard.name : null; }
})

Router.route('/myorchards/:_id/edit', function () {
  this.render('myOrchardsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard:  MyOrchards.findOne({_id:this.params._id})
      }
    }
  },
  name: 'myorchards.one.edit',
  parent: 'myorchards.one',
  title: 'Editar'
})

Router.route('/myorchards/:_id/trees', function () {
  this.render('myOrchardsTrees')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params._id),
      Meteor.subscribe('MyTrees', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard:  MyOrchards.findOne(this.params._id),
        myTrees:  MyTrees.find({orchardId:this.params._id}),
      }
    }
  },
  name: 'myorchards.one.trees.index',
  parent: 'myorchards.one',
  title: 'Árboles'
})

Router.route('/myorchards/:_id/trees/new', function () {
  this.render('myOrchardsTreesNew')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards'),
      Meteor.subscribe('TreesVariants')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne(this.params._id),
        myTree: { orchardId: this.params._id }
      }
    }
  },
  name: 'myorchards.one.trees.new',
  parent: 'myorchards.one.trees.index',
  title: 'Nuevo'
})



Router.route('/myorchards/:_id/trees/:_tree', function () {
  this.render('orchardsTreesView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params._id),
      Meteor.subscribe('MyTrees', this.params._id, this.params._tree)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id:this.params._id}),
        myTree: MyTrees.findOne({_id:this.params._tree}),
      }
    }
  },
  name: 'myorchards.trees.one',
  parent: 'myorchards.one.trees.index',
  title: function() { 
    return this.data().myTree ? this.data().myTree.name : null
  }
})

Router.route('/myorchards/:_id/trees/:_tree/edit', function () {
  this.render('orchardsTreesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards'),
      Meteor.subscribe('MyTrees', this.params._id, this.params._tree),
      Meteor.subscribe('TreesVariants')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myTree: MyTrees.findOne({_id:this.params._tree}),
      }
    }
  },
  name: 'myorchards.trees.one.edit',
  parent: 'myorchards.trees.one',
  title: 'Editar'
})





















Router.route('/myorchards/:_id/benchs', function () {
  this.render('myOrchardsBenchs')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params._id),
      Meteor.subscribe('MyBenchs', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard:  MyOrchards.findOne({_id:this.params._id}),
        myBenchs:  MyBenchs.find({orchardId:this.params._id}),
      }
    }
  },
  name: 'myorchards.one.benchs.index',
  parent: 'myorchards.one',
  title: 'Camas'
})

Router.route('/myorchards/:_id/benchs/new', function () {
  this.render('myOrchardsBenchsNew')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchards: MyOrchards.find(),
        myBench: { orchardId: this.params._id }
      }
    }
  },
  name: 'myorchards.one.benchs.new',
  parent: 'myorchards.one.benchs.index',
  title: 'Nueva'
})

Router.route('/myorchards/:_id/benchs/:_bench', function () {
  this.render('myOrchardsBenchsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params._id),
      Meteor.subscribe('MyBenchs', this.params._id, this.params._bench)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id:this.params._id}),
        myBench: MyBenchs.findOne({_id:this.params._bench}),
      }
    }
  },
  name: 'myorchards.one.benchs.one',
  parent: 'myorchards.one.benchs.index',
  title: function() { return this.data().myBench ? this.data().myBench.name : null }
})

Router.route('/myorchards/:_id/benchs/:_bench/edit', function () {
  this.render('myOrchardsBenchsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards'),
      Meteor.subscribe('MyBenchs', this.params._id, this.params._bench)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myBench:  MyBenchs.findOne({_id:this.params._bench}),
      }
    }
  },
  name: 'myorchards.one.benchs.one.edit',
  parent: 'myorchards.one.benchs.one',
  title: 'Editar'
})




Router.route('/myorchards/benchs/:_bench/edit', function () {
  this.render('myOrchardsBenchsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards'),
      Meteor.subscribe('MyBenchs', this.params._id, this.params._bench)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myBench:  MyBenchs.findOne({_id:this.params._bench}),
      }
    }
  },
  name: 'myorchards.benchs.one.edit',
  parent: 'myorchards.index',
  title: 'Editar'
})
































