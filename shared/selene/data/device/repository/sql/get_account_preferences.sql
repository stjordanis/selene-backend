SELECT
    ap.id,
    ap.measurement_system,
    ap.date_format,
    ap.time_format,
    json_build_object(
        'id', ww.id,
        'wake_word', ww.wake_word,
        'engine', ww.engine
    ) AS wake_word,
    json_build_object(
        'id', tts.id,
        'setting_name', tts.setting_name,
        'display_name', tts.display_name,
        'engine', tts.engine
    ) AS voice,
    json_build_object(
        'id', l.id,
        'country', l.country,
        'postal_code', l.postal_code,
        'time_zone', l.time_zone
    ) AS geography
FROM
    device.account_preferences ap
    LEFT JOIN device.wake_word ww ON ap.wake_word_id = ww.id
    LEFT JOIN device.text_to_speech tts ON ap.text_to_speech_id = tts.id
    LEFT JOIN device.location l ON ap.location_id = l.id
WHERE
    ap.account_id = %(account_id)s