class UsersController < ApplicationController
  before_action :authorize_user

  def update
    if @current_user.update(user_params)
      render_json({ user: @current_user })
    else
      render_error(@current_user.errors.full_messages.join(', '))
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :favourite_game, :preferred_platform, :email)
  end
end 