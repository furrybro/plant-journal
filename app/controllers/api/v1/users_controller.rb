class Api::V1::UsersController < ApplicationController
  # before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /me
  def show
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    user = User.find(session[:user_id])
    render json: user, status: :ok
  end

  # POST /signup
  def create
    user = User.create(user_params)
    session[:user_id] = user.id
    if user.valid?
        render json: user, status: :created
    else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :email, :password, :password_confirmation)
    end
end
