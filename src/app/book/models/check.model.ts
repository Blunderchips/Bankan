export interface Check {

    /**
     * List item primary key.
     */
    parent: string;
    /**
     * User responsible for action.
     */
    user: string;
    /**
     * State of the check.
     */
    isChecked: boolean;
    /**
     * Timestamp of when the check was made.
     */
    timestamp: Date;
}
