require File.dirname(__FILE__) + '/../spec_helper'

describe WhatsNext::Todo do
  
  context "when creating a new one" do
    
    it "has a blank #id attribute" do
      todo = WhatsNext::Todo.new
      todo.id.should_not be_blank
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
      todo.status = :completed
      todo.status.should == :completed
    end
    
    it "accepts strings when setting the #status attribute" do
      todo = WhatsNext::Todo.new
      todo.status = 'completed'
      todo.status.should == :completed
    end
    
    it "only allows certain statuses" do
      todo = WhatsNext::Todo.new
      
      [ :test, :complete, 'string', '', 123, [], {} ].each do |value|
        todo.status = value
        todo.status.should == :pending        
      end
    end
    
    it "can mass-assign attributes during initialization" do
      todo = WhatsNext::Todo.new :title => 'A different title', :status => :completed
      todo.title.should == 'A different title'
      todo.status.should == :completed
    end
      
  end
  
end