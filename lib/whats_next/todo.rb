module WhatsNext
  class Todo
    
    attr_accessor :title
    attr_reader :id, :status
    
    def initialize attributes = {}
      @title  = attributes[:title]  || attributes['title']
      @status = attributes[:status] || attributes['status'] || :pending
    end
    
    def save
      begin
        @id = self.class.collection.insert 'title' => @title
        true
      rescue Exception
        false
      end
    end
    
    def self.all
      self.collection.find.inject([]) { |arr, attributes| arr << self.new(attributes) }
    end
    
    def self.collection
      @collection ||= WhatsNext.database.collection 'todos'
    end
    
    def self.create attributes = {}
      todo = new(attributes)
      todo.save
      todo
    end
    
    def status= status
      @status = status
    end
    
  end
end