SELECT
    id
FROM
    skill.settings_display
WHERE
    skill_id = %(skill_id)s
    AND settings_display = %(display_data)s
