/**
 * Created by cmcrae on 5/24/17.
 */
import './demoButtons.html';
import {Session} from 'meteor/session';

Template.demoButtons.onCreated(function(){
    Session.set('marker-lines',false);
});

Template.demoButtons.helpers({

});

Template.demoButtons.events({
    'click .marker-lines': function(){
        //Enables ability to drop pins. Draws line from center pin to each new pin.
        Session.set('marker-lines',!Session.get('marker-lines'));
    }
});

