export default class ScoreboardPositionModel {
  constructor (props) {
    this.teamId = props.team_id
    this.totalRelative = props.total_relative
    this.attackPoints = props.attack_points
    this.attackRelative = props.attack_relative
    this.defencePoints = props.defence_points
    this.defenceRelative = props.defence_relative
    this.lastAttack = props.last_attack ? new Date(props.last_attack) : null
  }
}
