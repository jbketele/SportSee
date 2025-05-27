export default class UserDataFormatter {
    constructor({ mainData, activity, averageSessions, performance }) {
        // mainData = USER_MAIN_DATA (objet)
        // activity = USER_ACTIVITY (objet)
        // averageSessions = USER_AVERAGE_SESSIONS (objet)
        // performance = USER_PERFORMANCE (objet)

        // Infos utilisateur
        this.firstName = mainData?.userInfos?.firstName || "";
        this.keyData = mainData?.keyData || {};
        this.score = mainData?.todayScore !== undefined ? mainData.todayScore : mainData?.score;

        // Activité quotidienne (BarChart)
        this.activity = (activity?.sessions || []).map((session, i) => ({
            name: i + 1,
            kilogram: session.kilogram,
            calories: session.calories,
        }));

        // Sessions moyennes (LineChart)
        this.averageSessions = (averageSessions?.sessions || []).map((session) => ({
            day: ["L", "M", "M", "J", "V", "S", "D"][session.day - 1],
            sessionLength: session.sessionLength,
        }));

        // Performance (RadarChart)
        this.performance = (performance?.data || []).map((item) => ({
            subject: performance.kind[item.kind],
            value: item.value,
        }));
    }
}