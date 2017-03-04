/**
 * Copyright (c) 2016-2016 "Jose Constela" [jose@joseconstela.com]
 * Tiempo de Siembra [http://app.tiempodesiembra.es]
 *
 * This file is part of iempo de Siembra core's app.
 *
 * Tiempo de Siembra is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import { breadcrumbName } from './helpers/users'

Router.configure({
  layoutTemplate: 'appLayout'
})

Router.onBeforeAction( function() {
  if (!!this.params.userId) {
    Session.set('userId', this.params.userId)
    Meteor.subscribe('directory', this.params.userId);
  }
  this.next();
})

Router.onBeforeAction( function() {

  if (!Meteor.userId() && !Meteor.loggingIn()) {
    this.redirect('home');
    this.stop();
  } else {
    this.next();
  }

}, {except: [
  'home',
  'crops.index',
  'crops.families.index',
  'crops.families.one',
  'crops.one',
  'crops.calendar',
  'trees.index',
  'trees.one',
  'trees.families.index',
  'trees.families.one',
  'herbs.index',
  'herbs.one',
  'myorchards.index',
  'myorchards.one',
  'myorchards.one.trees.one',
  'myorchards.one.benchs.one',
  'profile.index'
] });

// *****************************************************************************
// Home
// *****************************************************************************

Router.route('/', function () {
  this.render('home')
  if (!Meteor.user()) {
    this.layout('siteLayout')
  }
}, {
  subscriptions: function() {
    return [
    ]
  },
  name: 'home',
  title: 'Inicio'
})

// *****************************************************************************
// Crops
// *****************************************************************************

Router.route('/crops/families', function () {
  this.render('cropFamilies')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropFamilies'),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        cropsFamilies: CropFamilies.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'crops.families.index',
  parent: 'crops.index',
  title: 'Familias'
})

Router.route('/crops/families/add', function () {
  this.render('cropFamiliesAdd')
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
  name: 'crops.families.add',
  parent: 'crops.families.index',
  title: 'Nueva'
})

Router.route('/crops/families/:_id/edit', function () {
  this.render('cropFamiliesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropFamilies', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        cropsFamily: CropFamilies.findOne({_id: this.params._id})
      }
    }
  },
  name: 'crops.families.edit',
  title: 'Editar'
})

Router.route('/crops/families/:_id', function () {
  this.render('cropFamiliesView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropFamilies', this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        cropsFamily: CropFamilies.findOne({_id: this.params._id})
      }
    }
  },
  name: 'crops.families.one',
  parent: 'crops.families.index',
  title: () => cropsFamily.name
})

Router.route('/crops', function () {
  this.render('crops')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropsResume')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        crops: Crops.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'crops.index',
  parent: 'home',
  title: 'Cultivos'
})

Router.route('/crops/calendar', function () {
  this.render('cropsCalendar')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropsTiming')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        crops: Crops.find({}, {sort: {name: 1}})
      }
    }
  },
  name: 'crops.calendar',
  parent: 'crops.index',
  title: 'Calendario'
})

Router.route('/crops/add', function () {
  this.render('cropsAdd')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropFamilies'),
      Meteor.subscribe('CropsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        cropFamilies: CropFamilies.find({}),
        cropNames: Crops.find({}, {fields: {name:1}, sort: { name: -1 }})
      }
    }
  },
  name: 'crops.add',
  title: 'Añadir',
  parent: 'crops.index'
})

Router.route('/crops/:_id', function () {
  this.render('cropsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('CropFamilies'),
      Meteor.subscribe('Crops', this.params._id),
      Meteor.subscribe('CropsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        crop: Crops.findOne({_id: this.params._id})
      }
    }
  },
  name: 'crops.one',
  title: function() { return this.data().crop ? this.data().crop.variant : '' },
  parent: 'crops.index'
})

Router.route('/crops/:_id/edit', function () {
  this.render('cropsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('Crops', this.params._id),
      Meteor.subscribe('CropFamilies'),
      Meteor.subscribe('CropsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        crop: Crops.findOne({_id: this.params._id})
      }
    }
  },
  name: 'crops.one.edit',
  title: 'Editar',
  parent: 'crops.one'
})

// *****************************************************************************
// Trees
// *****************************************************************************

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

// *****************************************************************************
// Hierbas
// *****************************************************************************

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
      Meteor.subscribe('CropsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        cropNames: Crops.find({}, {fields: {name:1}, sort: { name: -1 }})
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
      Meteor.subscribe('CropsNames')
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
      Meteor.subscribe('CropsNames')
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

// *****************************************************************************
// Huertos
// *****************************************************************************

Router.route('/:userId/myorchards', function () {
  this.render('myOrchards')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('TreesVariants'),
      Meteor.subscribe('MyOrchards', this.params.userId),
      Meteor.subscribe('MyBenchs', this.params.userId),
      Meteor.subscribe('MyTrees', this.params.userId)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchards: MyOrchards.find({userId: this.params.userId}, {sort: {name: 1}}),
          myTrees:  MyTrees.find({userId: this.params.userId}),
         myBenchs:  MyBenchs.find({userId: this.params.userId})
      }
    }
  },
  name: 'myorchards.index',
  parent: 'profile.index',
  title: 'Mis huertos'
})

Router.route('/:userId/myorchards/new', function () {
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

Router.route('/:userId/myorchards/:_id', function () {
  this.render('myOrchardsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('TreesVariants'),
      Meteor.subscribe('MyOrchards', this.params.userId, this.params._id),
      Meteor.subscribe('MyTrees', this.params.userId, this.params._id),
      Meteor.subscribe('MyBenchs', this.params.userId, this.params._id),
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchards: MyOrchards.findOne({userId: this.params.userId}),
        myOrchard:  MyOrchards.findOne({_id:this.params._id}),
          myTrees:  MyTrees.find({userId: this.params.userId, orchardId:this.params._id}, {sort: {name: 1}}),
         myBenchs:  MyBenchs.find({userId: this.params.userId, orchardId:this.params._id}, {sort: {name: 1}})
      }
    }
  },
  name: 'myorchards.one',
  parent: 'myorchards.index',
  title: function() { return this.data().myOrchard ? this.data().myOrchard.name : null; }
})

Router.route('/:userId/myorchards/:_id/edit', function () {
  this.render('myOrchardsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId, this.params._id)
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

// *****************************************************************************
// Huertos - Árboles
// *****************************************************************************

Router.route('/:userId/myorchards/:_id/trees/new', function () {
  this.render('myOrchardsTreesNew')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId),
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
  parent: 'myorchards.one',
  title: 'Nuevo árbol'
})

Router.route('/:userId/myorchards/:_id/trees/:tree', function () {
  this.render('orchardsTreesView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId, this.params._id),
      Meteor.subscribe('MyTrees', this.params.userId, this.params._id, this.params.tree)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id:this.params._id}),
        myTree: MyTrees.findOne({_id:this.params.tree}),
      }
    }
  },
  name: 'myorchards.one.trees.one',
  parent: 'myorchards.one',
  title: function() {
    return this.data().myTree ? this.data().myTree.name || 'Sin nombre' : 'Sin nombre'
  }
})

Router.route('/:userId/myorchards/:_id/trees/:tree/edit', function () {
  this.render('myOrchardsTreesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId),
      Meteor.subscribe('MyTrees', this.params.userId, this.params._id, this.params.tree),
      Meteor.subscribe('TreesVariants')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id:this.params._id}),
        myTree: MyTrees.findOne({_id:this.params.tree}),
      }
    }
  },
  name: 'myorchards.one.trees.one.edit',
  parent: 'myorchards.one.trees.one',
  title: 'Editar'
})

Router.route('/:userId/myorchards/:_id/benchs/new', function () {
  this.render('myOrchardsBenchsNew')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id: this.params._id}),
        myBench: { orchardId: this.params._id }
      }
    }
  },
  name: 'myorchards.one.benchs.new',
  parent: 'myorchards.one',
  title: 'Nuevo bancal'
})

Router.route('/:userId/myorchards/:_id/benchs/:bench', function () {
  this.render('myOrchardsBenchsView')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId, this.params._id),
      Meteor.subscribe('MyBenchs', this.params.userId, this.params._id, this.params.bench),
      Meteor.subscribe('MyPlants', this.params.userId,            null, this.params.bench),
      Meteor.subscribe('MyLogEntries', this.params.userId, 'bench', this.params.bench),
      Meteor.subscribe('CropsNames')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id:this.params._id}),
        myBench: MyBenchs.findOne({_id:this.params.bench}),
        myLogEntries: MyLogEntries.find({userId: this.params.userId}, {sort: { createdAt: -1 }}),
        myPlants: MyPlants.find({userId: this.params.userId}, {sort: { createdAt: -1 }})
      }
    }
  },
  name: 'myorchards.one.benchs.one',
  parent: 'myorchards.one',
  title: function() { return this.data().myBench ? this.data().myBench.name : null }
})

Router.route('/:userId/myorchards/:_id/benchs/:bench/edit', function () {
  this.render('myOrchardsBenchsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId),
      Meteor.subscribe('MyBenchs', this.params.userId, this.params._id, this.params.bench)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myOrchard: MyOrchards.findOne({_id:this.params._id}),
        myBench: MyBenchs.findOne({_id:this.params.bench}),
      }
    }
  },
  name: 'myorchards.one.benchs.one.edit',
  parent: 'myorchards.one.benchs.one',
  title: 'Editar'
})

Router.route('/:userId/myorchards/benchs/:_id/edit', function () {
  this.render('myOrchardsBenchsEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId),
      Meteor.subscribe('MyBenchs', this.params.userId, null, this.params._id)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myBench: MyBenchs.findOne({_id:this.params._id}),
      }
    }
  },
  name: 'myorchards.benchs.one.edit',
  parent: 'myorchards.index',
  title: 'Editar bancal'
})

Router.route('/:userId/myorchards/trees/:_id/edit', function () {
  this.render('myOrchardsTreesEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('MyOrchards', this.params.userId),
      Meteor.subscribe('MyTrees', this.params.userId, null, this.params._id),
      Meteor.subscribe('TreesVariants')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        myTree: MyTrees.findOne({_id:this.params._id}),
      }
    }
  },
  name: 'myorchards.trees.one.edit',
  parent: 'myorchards.index',
  title: 'Editar árbol'
})


Router.route('/:userId', function () {
  this.render('profileIndex')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('directory', this.params.userId),
      Meteor.subscribe('MyOrchards', this.params.userId),
      Meteor.subscribe('MyPlants', this.params.userId, null, null),
      Meteor.subscribe('CropsResume')
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        profile: Meteor.users.findOne({_id: this.params.userId}),
        myOrchards: MyOrchards.find({userId: this.params.userId}, {sort: {name: 1}}),
        myPlants: MyPlants.find({userId: this.params.userId}, {sort: { createdAt: -1 }})
      }
    }
  },
  name: 'profile.index',
  parent: 'home',
  title: function() {

    if (Meteor.user() && this.params.userId === Meteor.user()._id) {
      return breadcrumbName(Meteor.user())
    }

    try {
      return breadcrumbName(Meteor.users.findOne({_id: this.params.userId}))
    } catch (ex) {
      return 'usuario'
    }
  }
})

Router.route('/:userId/edit', function () {
  this.render('profileEdit')
}, {
  subscriptions: function() {
    return [
      Meteor.subscribe('directory', this.params.userId)
    ]
  },
  data: function() {
    if (this.ready) {
      return {
        profile: Meteor.users.findOne({_id: this.params.userId})
      }
    }
  },
  name: 'profile.edit',
  parent: 'profile.index',
  title: 'Editar'
})
