require File.dirname(__FILE__) + '/../spec_helper'

describe WhatsNext::Todo do
  
  it "can be initialized" do
    WhatsNext::Todo.new.should be_instance_of(WhatsNext::Todo)
  end
  
  it "memoizes a reference to its database collection" do
    WhatsNext.database.should_receive(:collection).once.with('todos').and_return 'the collection'
    WhatsNext::Todo.collection
    WhatsNext::Todo.collection
  end
  
  context "when creating a new one" do
    
    it "has a blank #id attribute" do
      todo = WhatsNext::Todo.new
      todo.id.should be_nil
    end
  
    it "has an accessible #title attribute" do
      todo = WhatsNext::Todo.new
      todo.title.should be_nil
      todo.title = 'I am the title'
      todo.title.should == 'I am the title'
    end
  
    it "can mass-assign attributes during initialization" do
      todo = WhatsNext::Todo.new :title => 'A different title'
      todo.title.should == 'A different title'
    end
    
    it "can NOT mass-assign the #id attribute during initialization" do
      todo = WhatsNext::Todo.new :id => 'abc123'
      todo.id.should be_nil
    end
  
    it "can be saved, which also sets the #id" do
      WhatsNext::Todo.collection.should_receive(:insert).with('title' => 'The Title').and_return 'abc123'
      todo = WhatsNext::Todo.new :title => 'The Title'
      todo.save.should equal(true)
      todo.id.should == 'abc123'
    end
    
    it "does not set the #id when the attempt to save fails" do
      WhatsNext::Todo.collection.should_receive(:insert).and_raise Exception
      todo = WhatsNext::Todo.new :title => 'The Title'
      todo.save.should equal(false)
      todo.id.should be_nil
    end
    
    it "can initialize and save in one step with #create" do
      todo = mock :todo
      todo.should_receive(:save).and_return true
      
      attributes = { :title => 'The Title' }
      WhatsNext::Todo.should_receive(:new).with(attributes).and_return todo
      
      WhatsNext::Todo.create(attributes).should equal(todo)
    end
  
  end
  
  context "when finding existing todos" do
    
    it "finds all" do
      cursor = mock :cursor
      WhatsNext::Todo.collection.should_receive(:find).and_return cursor
      cursor.should_receive(:to_a).and_return [ 1, 2, 3 ]
      WhatsNext::Todo.all.should == [ 1, 2, 3 ]
    end
    
  end
  
end