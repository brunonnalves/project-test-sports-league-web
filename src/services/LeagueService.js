import Rest from './api';

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard
 *
 */
class LeagueService {
  _matches = [];
  _leaderboard = [];

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this._matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this._matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    let auxLeaderboard = [];
    const victoryPoints = 3;
    const tiePoints = 1;

    this._matches.forEach((match) => {
      let homeObjAux;
      const homeIndex = auxLeaderboard.findIndex((obj) => obj.teamName === match.homeTeam);
      let awayObjAux;
      const awayIndex = auxLeaderboard.findIndex((obj) => obj.teamName === match.awayTeam);

      if (homeIndex === -1) {
        homeObjAux = {
          teamName: match.homeTeam,
          matchesPlayed: match.matchPlayed ? 1 : 0,
          goalsFor: match.homeTeamScore,
          goalsAgainst: match.awayTeamScore,
          points: 0,
        };
      }
      if (awayIndex === -1) {
        awayObjAux = {
          teamName: match.awayTeam,
          matchesPlayed: match.matchPlayed ? 1 : 0,
          goalsFor: match.awayTeamScore,
          goalsAgainst: match.homeTeamScore,
          points: 0,
        };
      }

      if (match.homeTeamScore === match.awayTeamScore) {
        // Tie
        if (homeIndex === -1) {
          homeObjAux.points = tiePoints;
          auxLeaderboard.push(homeObjAux);
        } else {
          match.matchPlayed ? (auxLeaderboard[homeIndex].matchesPlayed += 1) : null;
          auxLeaderboard[homeIndex].goalsFor += match.homeTeamScore;
          auxLeaderboard[homeIndex].goalsAgainst += match.awayTeamScore;
          auxLeaderboard[homeIndex].points += tiePoints;
        }

        if (awayIndex === -1) {
          awayObjAux.points = tiePoints;
          auxLeaderboard.push(awayObjAux);
        } else {
          match.matchPlayed ? (auxLeaderboard[awayIndex].matchesPlayed += 1) : null;
          auxLeaderboard[awayIndex].goalsFor += match.awayTeamScore;
          auxLeaderboard[awayIndex].goalsAgainst += match.homeTeamScore;
          auxLeaderboard[awayIndex].points += tiePoints;
        }
      } else if (match.homeTeamScore > match.awayTeamScore) {
        // Home Victory
        if (homeIndex === -1) {
          homeObjAux.points = victoryPoints;
          auxLeaderboard.push(homeObjAux);
        } else {
          match.matchPlayed ? (auxLeaderboard[homeIndex].matchesPlayed += 1) : null;
          auxLeaderboard[homeIndex].goalsFor += match.homeTeamScore;
          auxLeaderboard[homeIndex].goalsAgainst += match.awayTeamScore;
          auxLeaderboard[homeIndex].points += victoryPoints;
        }

        if (awayIndex === -1) {
          auxLeaderboard.push(awayObjAux);
        } else {
          match.matchPlayed ? (auxLeaderboard[awayIndex].matchesPlayed += 1) : null;
          auxLeaderboard[awayIndex].goalsFor += match.awayTeamScore;
          auxLeaderboard[awayIndex].goalsAgainst += match.homeTeamScore;
        }
      } else {
        // Away Victory
        if (homeIndex === -1) {
          auxLeaderboard.push(homeObjAux);
        } else {
          match.matchPlayed ? (auxLeaderboard[homeIndex].matchesPlayed += 1) : null;
          auxLeaderboard[homeIndex].matchesPlayed += 1;
          auxLeaderboard[homeIndex].goalsFor += match.homeTeamScore;
          auxLeaderboard[homeIndex].goalsAgainst += match.awayTeamScore;
        }

        if (awayIndex === -1) {
          awayObjAux.points = victoryPoints;
          auxLeaderboard.push(awayObjAux);
        } else {
          match.matchPlayed ? (auxLeaderboard[awayIndex].matchesPlayed += 1) : null;
          auxLeaderboard[awayIndex].goalsFor += match.awayTeamScore;
          auxLeaderboard[awayIndex].goalsAgainst += match.homeTeamScore;
          auxLeaderboard[awayIndex].points += victoryPoints;
        }
      }
    });

    auxLeaderboard.sort((a, b) => {
      // Compare points
      if (a.points !== b.points) {
        return b.points - a.points;
      }

      // First tiebreaker: Head-to-head points
      const headToHeadMatch = this._matches.find(
        (match) =>
          (match.homeTeam === a.teamName && match.awayTeam === b.teamName) ||
          (match.homeTeam === b.teamName && match.awayTeam === a.teamName)
      );
      if (headToHeadMatch && headToHeadMatch.homeTeamScore !== headToHeadMatch.awayTeamScore) {
        const winner =
          headToHeadMatch.homeTeamScore > headToHeadMatch.awayTeamScore
            ? headToHeadMatch.homeTeam
            : headToHeadMatch.awayTeam;

        if (winner === a.teamName) {
          return -1;
        } else if (winner === b.teamName) {
          return 1;
        }
      }

      // Second tiebreaker: Goal difference
      const goalDifferenceA = a.goalsFor - a.goalsAgainst;
      const goalDifferenceB = b.goalsFor - b.goalsAgainst;
      if (goalDifferenceA !== goalDifferenceB) {
        return goalDifferenceB - goalDifferenceA;
      }

      // Third tiebreaker: Scored goals
      if (a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }

      // Fourth tiebreaker: Alphabetic ascending order by name
      return a.teamName.localeCompare(b.teamName);
    });

    this._leaderboard = [...auxLeaderboard];
    return this._leaderboard;
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    try {
      const response = await Rest.get('/api/v1/getAllMatches');
      this.setMatches(response.data.matches);
    } catch (error) {
      console.log(error);
    }
  }
}

export default LeagueService;
