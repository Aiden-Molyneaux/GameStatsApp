class GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]

  def index
    games = @current_user.games
    render_json({ games: games })
  end

  def show
    render_json({ game: @game })
  end

  def create
    game = @current_user.games.build(game_params)
    if game.save
      render_json({ game: game }, status: :created)
    else
      render_error(game.errors.full_messages.join(', '))
    end
  end

  def update
    if @game.update(game_params)
      render_json({ game: @game })
    else
      render_error(@game.errors.full_messages.join(', '))
    end
  end

  def destroy
    @game.destroy
    head :no_content
  end

  private

  def set_game
    @game = @current_user.games.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_error('Game not found', :not_found)
  end

  def game_params
    params.permit(:name, :hours, :date_purchased, :title_colour, :header_colour)
  end
end 