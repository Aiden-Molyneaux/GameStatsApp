class AuthController < ApplicationController
  skip_before_action :authenticate_request, only: [:login, :register]

  def register
    user = User.new(user_params)
    if user.save
      token = jwt_encode(user_id: user.id)
      render_json({
        token: token,
        user: user
      }, status: :created)
    else
      render_error(user.errors.full_messages.join(', '))
    end
  end

  def login
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      token = jwt_encode(user_id: user.id)
      render_json({
        token: token,
        user: user
      })
    else
      render_error('Invalid username or password', :unauthorized)
    end
  end

  def me
    render_json({ user: @current_user })
  end

  private

  def user_params
    params.permit(:username, :password, :email, :favourite_game, :preferred_platform)
  end

  def jwt_encode(user_id:)
    JWT.encode({ id: user_id }, ENV['JWT_SECRET'], 'HS256')
  end
end 