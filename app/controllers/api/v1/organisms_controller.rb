class Api::V1::OrganismsController < ApplicationController
  # before_action :set_organism, only: %i[ show edit update destroy ]

  # GET /organisms or /organisms.json
  def index
    organisms = Organism.all
    render json: organisms
  end

  # GET /organisms/1 or /organisms/1.json
  def show
    organism = find_organism
    render json: organism
  end

  # POST /organisms or /organisms.json
  def create
    organism = Organism.create!(organism_params)
    render json: organism, status: :created
  end

  # PATCH/PUT /organisms/1 or /organisms/1.json
  def update
  
  end

  # DELETE /organisms/1 or /organisms/1.json
  def destroy
    organism = find_organism
    organism.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_organism
      Organism.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organism_params
      params.permit(:name, :species, :user_id)
    end
end
