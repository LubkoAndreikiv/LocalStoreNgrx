import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

/**
 * Base class for component with subscribtions.
 * Emit destroy event and alow to unsubscribe in derived class.
 */
export class ClearObservable implements OnDestroy {
  public destroy$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
