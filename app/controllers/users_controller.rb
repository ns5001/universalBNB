class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: User.all}
    end
  end

  def show
    @user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:age, :gender, :age, :firstName, :bio, :username :lastName)
  end

end
