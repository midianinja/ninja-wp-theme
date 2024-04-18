import apiFetch from '@wordpress/api-fetch'
import { BaseControl, Button, useBaseControlProps } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { addQueryArgs } from '@wordpress/url'
import { useEffect, useState } from 'react'

function fetchAlbums (api_key, user_id, page = 1) {
	return apiFetch({ path: addQueryArgs('/ninja/v1/flickr_albums', { api_key, user_id, page }) })
}

export default function selectUserAlbum({ flickrAPIKey, flickrUserId, onChange }) {
	const { baseControlProps } = useBaseControlProps({
		className: 'select-user-album',
		label: __('User albums', 'ninja'),
	})

	const [albums, setAlbums] = useState([])
	const [page, setPage] = useState(1)
	const [maxPages, setMaxPages] = useState(0)

	function fetchMore () {
		fetchAlbums (flickrAPIKey, flickrUserId, page + 1).then((res) => {
			setAlbums((curr) => [...curr, ...res.data])
			setPage(page + 1)
			setMaxPages(res.pages)
		})
	}

	useEffect(() => {
		fetchAlbums (flickrAPIKey, flickrUserId, 1).then((res) => {
			setAlbums(res.data)
			setPage(1)
			setMaxPages(res.pages)
		})
	}, [flickrUserId])

	return (
		<BaseControl {...baseControlProps}>
			<ul>
			{(albums).map((album) => (
				<li key={album.id}>
					<span>{album.title._content}</span>
					<Button variant="link" onClick={() => onChange(album.id)}>{__('Select', 'ninja')}</Button>
				</li>
			))}
			</ul>
			{(page < maxPages) ? (
				<Button className="fetch-more-albums" variant="tertiary" onClick={fetchMore}>{__('Show more', 'ninja')}</Button>
			) : null}
		</BaseControl>
	)
}
