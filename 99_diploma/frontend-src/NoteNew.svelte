<script>
  import {createEventDispatcher, onMount} from "svelte";
  import EasyMDE from "easymde";

  import {createNote} from "./api";

  const dispatch = createEventDispatcher();

  let title = "";

  let textarea;
  let isError;

  onMount(() => {
    const mdEditor = new EasyMDE({element: textarea, forceSync: true, status: false});
    return () => {
      try {
        mdEditor.cleanup();
      } catch (_err) {
      }
    };
  });

  const save = async () => {
    const text = textarea.value;
    if (!title && !text) {
      return;
    }
    try {
      const note = await createNote(title, text);
      dispatch("routeEvent", {type: "note-created", id: note.note_id});
    } catch (err) {
      isError = err.message;
    }
  };

  const cancel = () => {
    dispatch("routeEvent", {type: "note-create-cancelled"});
  };
</script>

{#if isError}
  <div class="uk-alert uk-alert-danger">
    <p>Ошибка: {isError}.</p>
  </div>
  <button on:click={cancel} class="uk-button uk-button-default">Закрыть</button>
{:else}
  <div class="uk-margin-bottom">
    <button on:click={save} class="uk-button uk-button-primary"><i class="fas fa-save"/>&nbsp;Сохранить</button>
    <button on:click={cancel} class="uk-button uk-button-default"><i class="fas fa-undo"/>&nbsp;Отмена</button>
  </div>

  <div class="uk-margin"><input bind:value={title} class="uk-input" type="text" placeholder="Заголовок"/></div>

  <div class="uk-margin"><textarea bind:this={textarea} class="uk-textarea"/></div>
{/if}
