class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: User.all}
    end
  end

  def show
    @user = current_user
  end

  def getSold
    if current_user
      respond_to do |format|
        format.json {render json: current_user.sold}
       end
    end
  end

  def getBought
    if current_user
      respond_to do |format|
        format.json {render json: current_user.bought}
       end
    end
  end

  private

  def user_params
    params.require(:user).permit(:age, :gender, :age, :firstName, :bio, :username, :lastName)
  end

end
