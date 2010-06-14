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
  
    it "has an accessible #status attribute" do
      todo = WhatsNext::Todo.new
      todo.status.should == :pending
      todo.status = :finished
      todo.status.should == :finished
    end
    
    it "can mass-assign attributes during initialization" do
      todo = WhatsNext::Todo.new :title => 'A different title', :status => :finished
      todo.title.should == 'A different title'
      todo.status.should == :finished
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
    
    before :each do
      @results = [
        { '_id' => '1a', 'title' => '1st Title' },
        { '_id' => '2b', 'title' => '2nd Title' },
        { '_id' => '3c', 'title' => '3rd Title' }
      ]
    end
    
    it "finds all" do
      WhatsNext::Todo.collection.should_receive(:find).and_return @results
      todos = WhatsNext::Todo.all

      todos.size.should == 3
      todos.each { |todo| todo.should be_instance_of(WhatsNext::Todo) }
      todos[0].title.should == '1st Title'
      todos[1].title.should == '2nd Title'
      todos[2].title.should == '3rd Title'
    end
    
  end
  
end