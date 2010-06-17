module WhatsNext
  class Todo
    
    include Mongoid::Document
    
    field :status, :default => 'pending'
    field :title
    
    def status
      read_attribute(:status).to_sym
    end
        
  end
end