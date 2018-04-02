class Article < ApplicationRecord
	has_many :comments
	
	validates :title, presence: true
end
