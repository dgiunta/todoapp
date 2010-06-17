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
      todo.status = :finished
      todo.status.should == :finished
    end
    
    it "can mass-assign attributes during initialization" do
      todo = WhatsNext::Todo.new :title => 'A different title', :status => :finished
      todo.title.should == 'A different title'
      todo.status.should == :finished
    end
      
  end
  
end