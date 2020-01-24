/**
 * Get infos to store from a git commit object
 * @param {object} commit git commit webhook payload
 * @return {{git_commit: string, message: string}|{}}
 */
export default function getMetaFromCommit(commit) {
    if (!commit) {
        return {};
    }

    const { message, id } = commit;

    return {
        message,
        git_commit: id,
    };
}

/**
 * Get meta info from the github webhook call
 * @param {hapi.Request} request
 * @return {{message: string, git_commit: string}}
 */
export function getMetaFromGithubWebhook(payload) {
    if (!payload) {
        return {};
    }

    // eslint-disable-next-line camelcase
    const { head_commit } = payload;
    return getMetaFromCommit(head_commit);
}