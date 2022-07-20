class Api::V1::SessionsController < ApplicationController

     # POST /login
     def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            puts "Setting session id for user with id: ", user.id

            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    # DELETE /logout
    def destroy
        session.delete :user_id
        head :no_content
    end
    
end
