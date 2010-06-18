module WhatsNext
  class Todo
    
    include Mongoid::Document
    
    field :status, :default => :pending
    field :title
    
    def status
      read_attribute(:status).to_sym
    end
    
    def status= status
      return unless [ :pending, :finished ].include? status
      write_attribute :status, status
    end
        
  end
end