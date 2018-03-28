class ArticlesController < ApplicationController	
	def index
		@articles = Article.all
	end

	def new
	end
	
	def create
		@article = Article.new(params.require(:article).permit(:title, :text))

		@article.save
		redirect_to @article
	end
	
	def show
		@article = Article.find(params[:id])
	end


end
