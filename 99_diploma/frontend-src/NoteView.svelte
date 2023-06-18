<script>
  import {createEventDispatcher} from "svelte";

  import {archiveNote, deleteNote, getNote, notePdfUrl, unarchiveNote} from "./api";

  import Progress from "./Progress.svelte";

  export let params;

  const dispatch = createEventDispatcher();

  $: p = getNote(params.id);

  const close = async () => {
    dispatch("routeEvent", {type: "note-closed", id: params.id});
  };

  const doArchive = async () => {
    await archiveNote(params.id);
    dispatch("routeEvent", {type: "note-archived", id: params.id});
  };

  const doDelete = async () => {
    await deleteNote(params.id);
    dispatch("routeEvent", {type: "note-deleted", id: params.id});
  };

  const doUnarchive = async () => {
    await unarchiveNote(params.id);
    dispatch("routeEvent", {type: "note-unarchived", id: params.id});
  };

  const doEdit = () => {
    dispatch("routeEvent", {type: "note-edit-started", id: params.id});
  };
</script>

{#await p}
  <Progress/>
{:then entry}
  <h1>{entry.title}</h1>
  <div class="uk-margin-bottom">
    {#if entry.is_archive}
      <button on:click={doDelete} class="uk-button uk-button-default"><i class="fas fa-trash"></i>&nbsp;Удалить</button>
      <button on:click={doUnarchive} class="uk-button uk-button-default"><i class="fas fa-archive"></i>&nbsp;Восстановить
      </button>
    {:else}
      <button on:click={doArchive} class="uk-button uk-button-default"><i class="fas fa-archive"></i>&nbsp;В архив
      </button>
    {/if}

    <button on:click={doEdit} class="uk-button uk-button-primary"><i class="fas fa-edit"></i>&nbsp;Редактировать
    </button>
    <button on:click={notePdfUrl(entry.note_id)} class="uk-button uk-button-secondary"><i
      class="fas fa-file-download"></i>&nbsp;PDF
    </button>
    <button on:click={close} class="uk-button uk-button-default"><i class="fas fa-times"></i>&nbsp;Закрыть</button>
  </div>
  <div class="uk-card uk-card-default uk-card-body">
    {@html entry.html}
  </div>
{:catch error}
  <div class="uk-alert uk-alert-danger">
    <p>Ошибка: {error.message}.</p>
  </div>
{/await}
