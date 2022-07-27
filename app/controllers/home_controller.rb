class HomeController < ApplicationController
    def index
        respond_to do |format|
            format.html
            format.any
        end
    end
end
