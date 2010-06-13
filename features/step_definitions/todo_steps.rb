Given /^a "([^\"]*)" todo$/ do |title|
  WhatsNext::Todo.create :title => title
end

Given /^the following todos:$/ do |table|
  table.raw.each do |row|
    Given %|a "#{ row[0] }" todo|
  end
end